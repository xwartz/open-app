interface Props {
    schemeUrl?: string;
    fallbackUrl?: string;
    buttonStyle?: any;
    buttonText?: string;
    timeout?: number;
}
export default class OpenApp {
    props: any;
    tip: any;
    timer: any;
    constructor(props: Props);
    render(): void;
    renderButton(): void;
    renderTip(): void;
    showTip: () => void;
    hideTip: () => void;
    open: () => void;
    fallback: () => void;
    _checkOpen: () => void;
}
export {};
