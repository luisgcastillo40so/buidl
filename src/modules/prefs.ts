import { ActionContext } from "vuex";
import * as monaco from "monaco-editor";

export interface Web3Provider {
  url: string;
  chainId: string;
}
export interface ESProvider {
  url: string;
}

export default {
  namespaced: true,
  state: {
    site: "lity",
    darkTheme: false,
    web3Provider: {
      default: {
        gasPrice: "0",
        gasLimit: "8192000000"
      },
      options: [
        {
          url: "https://rpc.parastate.io:8545",
          chainId: "123"
        }
      ],
      using: "0",
      usingMetaMask: false,
      custom: {
        url: "",
        chainId: "",
        customGas: true,
        gasPrice: "",
        gasLimit: ""
      },
      status: "pending",
      confirmInterval: 1 * 1000,
      extendConfirmInterval: 20 * 1000,
      metamaskPrompt: false
    },
    esProvider: {
      options: [
      ],
      using: "0",
      custom: {
        url: ""
      },
      status: "pending"
    },
    updateAvail: null
  },
  mutations: {
    toggleTheme(state: any) {
      state.darkTheme = !state.darkTheme;
      window.document.body.className = state.darkTheme ? "dark-theme" : "";
      monaco.editor.setTheme(state.darkTheme ? "vs-dark" : "");
    },
    switchSite(state: any, site: string) {
      state.site = site;
    },
    addMetaMask(state: any, name: string) {
      state.web3Provider.options.push({
        url: name,
        chainId: "0"
      });
    },
    promptMetaMask(state: any, prompt: boolean) {
      state.web3Provider.metamaskPrompt = prompt;
    },
    setWeb3ProviderUsingWithoutMetaMask(state: any, using: string) {
      state.web3Provider.using = using;
    },
    setWeb3ProviderUsing(state: any, using: string) {
      if (
        Number(using) > 0 &&
        Number(using) === state.web3Provider.options.length - 1
      ) {
        state.web3Provider.usingMetaMask = true;
      } else {
        state.web3Provider.usingMetaMask = false;
      }
      state.web3Provider.using = using;
    },
    setWeb3ProviderCustom(state: any, custom: Web3Provider) {
      state.web3Provider.custom = custom;
    },
    setWeb3ProviderStatus(state: any, status: string) {
      state.web3Provider.status = status;
    },
    setESProviderUsing(state: any, using: string) {
      state.esProvider.using = using;
    },
    setESProviderCustom(state: any, custom: ESProvider) {
      state.esProvider.custom = custom;
    },
    setESProviderStatus(state: any, status: string) {
      state.esProvider.status = status;
    },
    updateAvail(state: any, sw: object) {
      state.updateAvail = sw;
    }
  },
  actions: {
    toggleTheme(context: ActionContext<any, any>) {
      context.commit("toggleTheme");
    },
    switchSite(context: ActionContext<any, any>, payload: string) {
      context.commit("switchSite", payload);
    },
    setWeb3ProviderUsing(context: ActionContext<any, any>, payload: string) {
      context.commit("setWeb3ProviderUsing", payload);
    },
    setWeb3ProviderUsingWithoutMetaMask(
      context: ActionContext<any, any>,
      payload: string
    ) {
      context.commit("setWeb3ProviderUsingWithoutMetaMask", payload);
    },
    setWeb3ProviderCustom(
      context: ActionContext<any, any>,
      payload: Web3Provider
    ) {
      context.commit("setWeb3ProviderCustom", payload);
    },
    setWeb3ProviderStatus(context: ActionContext<any, any>, payload: string) {
      context.commit("setWeb3ProviderStatus", payload);
    },
    addMetaMask(context: ActionContext<any, any>, payload: string) {
      context.commit("addMetaMask", payload);
    },
    promptMetaMask(context: ActionContext<any, any>, payload: boolean) {
      context.commit("promptMetaMask", payload);
    },
    setESProviderUsing(context: ActionContext<any, any>, payload: string) {
      context.commit("setESProviderUsing", payload);
    },
    setESProviderCustom(context: ActionContext<any, any>, payload: ESProvider) {
      context.commit("setESProviderCustom", payload);
    },
    setESProviderStatus(context: ActionContext<any, any>, payload: string) {
      context.commit("setESProviderStatus", payload);
    },
    updateAvail(context: ActionContext<any, any>, payload: object) {
      context.commit("updateAvail", payload);
    }
  }
};
