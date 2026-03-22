export const getApiErrorMessage = (error, fallbackMessage) => {
  const responseData = error?.response?.data;

  if (typeof responseData?.error === 'string' && responseData.error.trim()) {
    return responseData.error;
  }

  if (responseData && typeof responseData === 'object') {
    const fieldMessages = Object.values(responseData).filter(
      (value) => typeof value === 'string' && value.trim(),
    );

    if (fieldMessages.length > 0) {
      return fieldMessages.join(', ');
    }
  }

  if (typeof error?.message === 'string' && error.message.trim() && !error.response) {
    return `Cannot reach backend: ${error.message}`;
  }

  return fallbackMessage;
};
