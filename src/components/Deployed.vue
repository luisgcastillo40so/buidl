<template>
  <div class="deployed-contracts">
    <div class="contract" v-for="(c, cIndex) in contracts" :key="c.address">
      <h3 @click="toggleFuncs(cIndex)" :class="c.address ? 'ready' : ''">
        {{ c.name }}
        <span class="pending" v-if="!c.address">(Pending)</span>
      </h3>
      <div class="tx-hash" v-show="c.txHash" :title="c.txHash">
        <label>Tx:</label> {{ c.txHash }}
        <input :ref="`c${c.txHash}`" type="hidden" :value="c.txHash" />
        <div class="contract-op">
          <a @click="copy(c.txHash, $event)">Copy</a>
        </div>
      </div>
      <div class="addr" v-show="c.address" :title="c.address">
        <label>Addr:</label> {{ c.address }}
        <input :ref="`c${c.address}`" type="hidden" :value="c.address" />
        <div class="contract-op">
          <a @click="copy(c.address, $event)">Copy</a>
        </div>
      </div>
      <div
        class="contract-actions"
        v-show="c.address && shownFuncs.indexOf(cIndex) > -1"
      >
        <template v-for="(abi, aIndex) in c.abi">
          <div
            class="contract-action"
            v-if="abi.type === 'function' && abi.name !== ''"
            :key="`${abi.name}_${abi.inputs.length}`"
          >
            <h4>{{ abi.name }}</h4>
            <div
              class="action-input-item"
              v-for="(input, i) in abi.inputs"
              :key="`${abi.name}${input.name}${i}`"
            >
              <input
                type="text"
                :ref="`${c.address}_${abi.name}_${input.name}`"
                :placeholder="input.name"
              />
            </div>
            <button v-if="abi.constant" @click="call(cIndex, aIndex)">
              Call
            </button>
            <button v-else @click="transact(cIndex, aIndex)">Transact</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LityWeb3 from "@/services/web3";
@Component({
  components: {}
})
export default class Deployed extends Vue {
  shownFuncs: number[] = [];

  get contracts() {
    return this.$store.state.deployed.contracts;
  }

  copy(addr: string, e: any) {
    const input = (this.$refs[`c${addr}`] as any)[0];
    input.setAttribute("type", "text");
    input.select();
    document.execCommand("copy");
    input.setAttribute("type", "hidden");
    e.target.innerText = "Copied";
    setTimeout(() => {
      e.target.innerText = "Copy";
    }, 500);
  }

  toggleFuncs(cIndex: number) {
    const i = this.shownFuncs.indexOf(cIndex);
    if (i > -1) {
      this.shownFuncs.splice(i, 1);
    } else {
      this.shownFuncs.push(cIndex);
    }
  }

  newLityWeb3() {
    const provider = this.$store.state.prefs.web3Provider;
    const pUrl =
      provider.using !== ""
        ? provider.options[provider.using].url
        : provider.custom.url;
    return LityWeb3(pUrl, "Lity");
  }

  call(cIndex: number, aIndex: number) {
    const deployedContract = this.contracts[cIndex];

    let params = [];
    for (let input of deployedContract.abi[aIndex].inputs) {
      params.push(
        (this.$refs[
          `${deployedContract.address}_${deployedContract.abi[aIndex].name}_${
            input.name
          }`
        ] as any)[0].value
      );
    }
    this.$store.dispatch(`events/setLityOutputTab`, "logs");
    const web3 = this.newLityWeb3();
    const contract = web3.ss.contract(deployedContract.abi);
    const instance = contract.at(deployedContract.address);
    const func = instance[deployedContract.abi[aIndex].name];
    this.$store.dispatch(
      "outputs/pushLityLogs",
      `Call {${deployedContract.abi[aIndex].name}} at
        ${deployedContract.address} returned:`
    );
    try {
      params.push((err: any, data: any) => {
        if (err !== null) {
          this.$store.dispatch(
            "outputs/pushLityLogs",
            `<span class="error">${err}</span>`
          );
        } else {
          this.$store.dispatch("outputs/pushLityLogs", data);
        }
      });
      func.apply(func, params);
    } catch (e) {
      this.$store.dispatch(
        "outputs/pushLityLogs",
        `<span class="error">${e}</span>`
      );
    }
  }

  transact(cIndex: number, aIndex: number) {
    const deployedContract = this.contracts[cIndex];

    let params = [];
    for (let input of deployedContract.abi[aIndex].inputs) {
      params.push(
        (this.$refs[
          `${deployedContract.address}_${deployedContract.abi[aIndex].name}_${
            input.name
          }`
        ] as any)[0].value
      );
    }

    const web3 = this.newLityWeb3();
    const contract = web3.ss.contract(deployedContract.abi);
    const instance = contract.at(deployedContract.address);
    const func = instance[deployedContract.abi[aIndex].name];

    try {
      func.apply(func, params);
    } catch (e) {
      this.$store.dispatch(
        "outputs/pushLityLogs",
        `<span class="error">${e}</span>`
      );
    }
  }
}
</script>

<style lang="stylus">
@import "../assets/themes/light.styl"

.deployed-contracts
  padding 1em 0
  height 100%
  overflow scroll
  .contract
    padding 1em 0 0
    font-size 0.9em
    &:first-child
      padding-top 0
    h3
      display inline-block
      padding 0
      margin 0 1rem 0.5em
      &.ready
        text-decoration underline
        cursor pointer
      .pending
        font-size 0.8em
        color rgba($color, 0.5)
    .addr, .tx-hash
      white-space nowrap
      position relative
      padding 0 1rem 1em
      overflow-x hidden
      text-overflow ellipsis
      label
        font-size 0.8em
        color rgba($color, 0.5)
      .contract-op
        display none
        position absolute
        font-size 0.8em
        color rgba($color, 0.5)
        a
          cursor pointer
          margin-right 1em
      &:hover
        .contract-op
          display block
    .contract-actions
      background-color $minorBackgroundColor
      box-shadow inset 0px 10px 10px -10px darken($minorBackgroundColor, 25%),
        inset 0px -10px 10px -10px darken($minorBackgroundColor, 25%)
      .contract-action
        padding 1em
        margin-bottom 1em
        &:last-child
          margin-bottom 0
      h4
        margin 0 0 1em
      .action-input-item
        margin 1em 0
</style>

<style lang="stylus">
@import "../assets/themes/dark.styl"

body.dark-theme
  .deployed-contracts
    .contract
      .addr, .tx-hash
        .contract-op, label
          color rgba($color, 0.5)
      .contract-actions
        background-color $minorBackgroundColor
        box-shadow inset 0px 10px 10px -10px darken($minorBackgroundColor, 25%),
          inset 0px -10px 10px -10px darken($minorBackgroundColor, 25%)
</style>
