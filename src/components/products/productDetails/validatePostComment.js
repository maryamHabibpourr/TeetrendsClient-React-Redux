
export const validatePostComment = (data) => {
    const errors = {};

    if (!data.commentValue.trim()) {
        errors.commentValue = "این فیلد نباید خالی باشد!";
    }

    return errors;
}
