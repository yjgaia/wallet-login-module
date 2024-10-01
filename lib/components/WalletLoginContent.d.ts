import { DomNode } from "@common-module/app";
export default class WalletLoginContent extends DomNode {
    private message;
    private onLoggedIn;
    private onError;
    private onBeforeLogin?;
    constructor(message: string, onLoggedIn: () => void, onError: (error: Error) => void, onBeforeLogin?: ((walletId: string) => void) | undefined);
    private handleLogin;
}
//# sourceMappingURL=WalletLoginContent.d.ts.map