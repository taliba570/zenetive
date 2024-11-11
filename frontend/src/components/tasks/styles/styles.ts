export const AddTaskSelectStyle = {
  control: (base: any) => ({
    ...base,
    backgroundColor: document.documentElement.classList.contains('dark') 
      ? '#374151'   // Dark mode background
      : 'rgb(243 244 246)', // Light mode background
    borderColor: document.documentElement.classList.contains('dark')
      ? 'rgb(75 85 99)'    // Dark mode border
      : 'rgb(209 213 219)', // Light mode border
    color: document.documentElement.classList.contains('dark')
      ? '#fff'  // Dark mode text
      : 'rgb(17 24 39)',    // Light mode text
    '&:hover': { 
      borderColor: document.documentElement.classList.contains('dark')
        ? 'rgb(156 163 175)'  // Dark mode hover
        : 'rgb(239 68 68)',   // Light mode hover
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: document.documentElement.classList.contains('dark') 
      ? '#374151'   // Dark mode background for menu
      : 'rgb(243 244 246)', // Light mode background for menu
    color: document.documentElement.classList.contains('dark') 
      ? 'rgb(255 255 255)'  // Dark mode text
      : 'rgb(17 24 39)',    // Light mode text
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? document.documentElement.classList.contains('dark')
        ? '#4B5563'  // Dark mode selected background
        : '#E5E7EB'  // Light mode selected background
      : state.isFocused
        ? document.documentElement.classList.contains('dark')
          ? '#6B7280'  // Dark mode hover background
          : '#F3F4F6'  // Light mode hover background
        : 'transparent', // Default background
    color: document.documentElement.classList.contains('dark')
      ? '#fff'  // Dark mode text
      : '#000', // Light mode text
    '&:hover': {
      backgroundColor: document.documentElement.classList.contains('dark')
        ? '#6B7280'  // Dark mode hover background
        : '#E5E7EB',  // Light mode hover background
    },
  }),
  input: (base: any) => ({
    ...base,
    color: document.documentElement.classList.contains('dark') 
      ? '#fff'  // Dark mode input text
      : 'rgb(17 24 39)',    // Light mode input text
  }),
  singleValue: (base: any) => ({
    ...base,
    color: document.documentElement.classList.contains('dark') 
      ? '#fff'  // Dark mode selected value text
      : 'rgb(17 24 39)',    // Light mode selected value text
  }),
  placeholder: (base: any) => ({
    ...base,
    color: document.documentElement.classList.contains('dark') 
      ? '#9CA3AF'  // Dark mode placeholder
      : 'rgb(107 114 128)',  // Light mode placeholder
  }),
}