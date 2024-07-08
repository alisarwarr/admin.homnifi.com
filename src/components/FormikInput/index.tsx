import { InputAdornment, TextField } from '@mui/material';

export default function FormikInput({
  label,
  type = 'text',
  name,
  onChange = () => {},
  disabled = false,
  value = '',
  error,
  placeholder,
  shrink = undefined,
  inputStyle,
  touched,
  inputRef,
  className,
  showAdornment,
  adornment,
  multiline = false,
  rows = 0,
}: {
  label: string;
  type: string;
  name: string;
  onChange?: any;
  value?: any;
  error?: any;
  placeholder?: string;
  disabled?: boolean;
  shrink?: boolean;
  inputStyle?: any;
  touched?: any;
  inputRef?: any;
  className?: string;
  showAdornment?: boolean;
  adornment?: any;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="w-full">
      <div className={`flex flex-col gap-1 relative  ${className}`}>
        <>
          <TextField
            multiline={multiline}
            rows={rows}
            error={error && touched ? true : false}
            label={label}
            variant="outlined"
            className={`w-full`}
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value ? value : null}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D7D7D7', // default outline color
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main', // outline color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main', // outline color when focused
                },
              },
              '& .MuiFormLabel-root': {
                fontSize: '0.8rem',
              },
              '& .MuiInputBase-input': {
                fontSize: '0.8rem',
                ...inputStyle,
              },
              '&:hover fieldset': {
                borderColor: '#115293', // primary.dark outline color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2', // primary.main outline color when focused
              }
            }}
            inputRef={inputRef}
            InputLabelProps={{
              shrink: shrink,
            }}
            InputProps={{
              startAdornment: showAdornment ? <InputAdornment position="start">{adornment}</InputAdornment> : <></>,
            }}
            disabled={disabled}
          />
          {/* {isRuntimeCheck && (
                <RuntimeCheck
                    isTyping={isTyping}
                    availablity={availablity}
                    onClick={() => {
                        setFieldValue(name, "")
                    }}
                    value={value}
                    error={error}
                    message={messageRuntimeCheck}
                    className={`top-3 right-0 ${className}`}
                />
            )} */}
          {error && touched && <span className="text-xs text-errorColor">{error}</span>}
        </>
      </div>
    </div>
  );
}
