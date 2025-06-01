import React from 'react';

const SkinToneStrip: React.FC = () => {
  // Define skin tone gradient segments from light to dark
  const skinTones = [
    { color: '#FFF6ED', pattern: 'dots-light' },
    { color: '#FFE4C4', pattern: 'dots-medium' },
    { color: '#F5DCBA', pattern: 'lines-light' },
    { color: '#E6C7A0', pattern: 'lines-medium' },
    { color: '#D4A373', pattern: 'crosshatch-light' },
    { color: '#B08968', pattern: 'crosshatch-medium' },
    { color: '#8B5E3C', pattern: 'dense-lines' },
    { color: '#6F4E37', pattern: 'dense-crosshatch' },
    { color: '#513127', pattern: 'very-dense-lines' },
    { color: '#3B1E15', pattern: 'very-dense-crosshatch' }
  ];

  return (
    <div className="fixed z-index=1111111 left-0 top-0 bottom-0 w-3 flex flex-col">
      {skinTones.map((tone, index) => (
        <div
          key={index}
          className="flex-1 relative"
          style={{ backgroundColor: tone.color }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z' fill='%23000' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: index < 5 ? '4px 4px' : '3px 3px',
              opacity: 0.1 + (index * 0.1)
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SkinToneStrip;