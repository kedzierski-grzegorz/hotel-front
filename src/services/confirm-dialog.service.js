const ConfirmDialogService = {
    dialog: undefined,
    show(title, message, options) {
        return this.dialog.open(title, message, options);
    }
};

export default ConfirmDialogService;
