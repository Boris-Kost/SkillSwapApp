
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockError = (message: string) => {
    throw new Error(message);
};
