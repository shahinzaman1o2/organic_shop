export interface Category {
    payload: {
        key: string;
        val: () => {
            name: string;
        };
    };
}
