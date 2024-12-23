import { el } from "@common-module/app";
import { Button } from "@common-module/app-components";
import { WalletPopupBase } from "@common-module/wallet";
import WalletLoginContent from "./WalletLoginContent.js";

export default class WalletLoginModal extends WalletPopupBase {
  private resolveLogin: (() => void) | undefined;
  private rejectLogin: ((reason: Error) => void) | undefined;

  constructor() {
    super(".wallet-login-modal");
    this
      .on(
        "remove",
        () => this.rejectLogin?.(new Error("Login canceled by user")),
      )
      .appendToHeader(el("h1", "Login with Crypto Wallet"))
      .appendToMain(
        new WalletLoginContent(
          () => {
            this.resolveLogin?.();
            this.rejectLogin = undefined;
            this.remove();
          },
          (error) => {
            console.error(error);
            this.restoreModal(error.message);
          },
          (walletId) => this.temporarilyCloseModal(walletId),
        ),
      )
      .appendToFooter(
        new Button(".cancel", {
          title: "Cancel",
          onClick: () => this.remove(),
        }),
      );
  }

  public async waitForLogin(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.resolveLogin = resolve;
      this.rejectLogin = reject;
    });
  }
}
