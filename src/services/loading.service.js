const LoadingService = {
    loadingComponent: undefined,
    show() {
        this.loadingComponent.show();
    },
    hide() {
        this.loadingComponent.hide();
    }
};

export default LoadingService;
