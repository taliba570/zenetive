export const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#f3f4f6' : '#fff',
    borderColor: state.isFocused ? '#4b5563' : '#d1d5db', // Adjusting border color
    boxShadow: state.isFocused ? '0 0 0 1px #4b5563' : 'none',
    '&:hover': { borderColor: '#4b5563' }, // Hover state
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#fff',
    zIndex: 999, // Ensuring dropdown appears on top
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: '#f9fafb', // Lighter background for the options
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#3b82f6'
      : state.isFocused
      ? '#dbeafe'
      : '#fff',
    color: state.isSelected || state.isFocused ? '#111827' : '#374151',
    '&:hover': {
      backgroundColor: '#dbeafe', // Hover color
    },
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#6b7280', // Placeholder color (gray)
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#111827', // Selected value text color (dark)
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#111827', // Input text color
  }),
};

export const SelectedTaskDisplayStyles = {
  container: {
    padding: '10px',
    backgroundColor: '#f3f4f6',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#374151',
  },
  taskName: {
    fontSize: '14px',
    color: '#111827',
  },
};