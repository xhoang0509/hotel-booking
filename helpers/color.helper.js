const colors = ['#f50', '#2db7f5', '#87d068', '#108ee9'];

export function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
