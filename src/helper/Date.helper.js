function getAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const now = new Date();

    let age = now.getUTCFullYear() - birthDate.getUTCFullYear();
    const monthDiff = now.getUTCMonth() - birthDate.getUTCMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getUTCDate() < birthDate.getUTCDate())) {
        age--;
    }

    return age;
}

module.exports = {
    getAge,
};
