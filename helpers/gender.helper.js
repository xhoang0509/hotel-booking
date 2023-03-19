export const optionsGender = [
    {
        value: "male",
        label: "Nam"
    },
    {
        value: "female",
        label: "Nữ"
    },
    {
        value: "nb",
        label: "Không xác định (Non-binary"
    },
    {
        value: "nondisclosure",
        label: "Không muốn nêu rõ"
    }
];

export const getGenderName = (genderCode) => {
    const gender = optionsGender.find(gender => gender.value === genderCode);
    if(gender) {
        return gender.label;
    } else {
        return "";
    }
}