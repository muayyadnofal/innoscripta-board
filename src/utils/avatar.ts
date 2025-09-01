export const generateAvatarUrl = (): string => {
    const id = Math.floor(Math.random() * 100) + 1;
    return `https://i.pravatar.cc/100?u=${id}`;
};