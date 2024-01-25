interface useGeneralInputReturnProps {
  getMaxLabelWidth: (labels: string[]) => number;
}

const useGeneralInput = (): useGeneralInputReturnProps => {
  const getMaxLabelWidth = (labels: string[]): number => {
    const maxLength = Math.max(...labels.map((label) => label.length));
    return maxLength * 8;
  };

  return { getMaxLabelWidth };
};

export default useGeneralInput;
