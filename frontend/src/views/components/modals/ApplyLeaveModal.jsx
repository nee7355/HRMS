import React, { useEffect, useMemo } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Dialog,
  OutlinedInput,
  Select,
  Stack,
  Typography
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IconX } from '@tabler/icons-react';

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1
  }
};

const leaveTypeSchema = {
  required: 'Leave type is required'
};

const startDateSchema = {
  required: 'Start date is required'
};

const endDateSchema = {
  required: 'End date is required'
};

const reasonSchema = {
  maxLength: {
    value: 500,
    message: 'Reason cannot exceed 500 characters'
  }
};

const ApplyLeaveModal = ({
  open,
  onClose,
  leaveTypes = [],
  onSubmitLeave,
  isProcessing = false,
  registerError = ''
}) => {
  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      leaveTypeId: '',
      startDate: '',
      endDate: '',
      totalDays: 0,
      reason: ''
    }
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  /*
   * Calculate total leave days
   */
  const totalDays = useMemo(() => {
    if (!startDate || !endDate) {
      return 0;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return 0;
    }

    if (end < start) {
      return 0;
    }

    const difference =
      end.getTime() - start.getTime();

    return Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ) + 1;
  }, [startDate, endDate]);

  /*
   * Keep totalDays inside react-hook-form
   */
  useEffect(() => {
    setValue('totalDays', totalDays);
  }, [totalDays, setValue]);

  /*
   * Reset form when modal closes
   */
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onInvalid = (errors) => {
    console.log('Validation errors:', errors);
  };

  const handleFormSubmit = (data) => {
    const payload = {
      leaveTypeId: data.leaveTypeId,
      startDate: data.startDate,
      endDate: data.endDate,
      totalDays: data.totalDays,
      reason: data.reason?.trim() || ''
    };

    onSubmitLeave(payload);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="apply-leave-modal"
    >
      <DialogTitle component={Stack} direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ py: `4px !important` }}>
        <Typography
          id="apply-leave-modal"
          variant="h5"
          fontWeight={600}
        >
          Apply Leave
        </Typography>
        <IconButton shape='rounded' color='secondary' onClick={onClose}><IconX /></IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
      

        <form
          id='applyLeave-form'
          onSubmit={handleSubmit(handleFormSubmit, onInvalid)}
          autoComplete="off"
        >
          <Grid
            container
            rowSpacing={2}
            columnSpacing={1.5}
          >

            {/* Leave Type */}
            <Grid size={{ xs: 12 }}>
              <InputLabel id="leave-type">
                Leave Type
              </InputLabel>

              <Controller
                name="leaveTypeId"
                control={control}
                rules={leaveTypeSchema}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value ?? ''}
                    labelId="leave-type"
                    displayEmpty
                    fullWidth
                    error={Boolean(errors.leaveTypeId)}
                    sx={inputSx}
                  >
                    <MenuItem value="">
                      -- Select Leave Type --
                    </MenuItem>

                    {leaveTypes.map((leave) => (
                      <MenuItem
                        key={leave._id}
                        value={leave._id}
                      >
                        {leave.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />

              {errors.leaveTypeId?.message && (
                <FormHelperText error>
                  {errors.leaveTypeId.message}
                </FormHelperText>
              )}
            </Grid>

            {/* Start Date */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel>
                Start Date
              </InputLabel>

              <OutlinedInput
                {...register(
                  'startDate',
                  startDateSchema
                )}
                type="date"
                fullWidth
                error={Boolean(errors.startDate)}
                sx={inputSx}
                inputProps={{
                  min: new Date()
                    .toISOString()
                    .split('T')[0]
                }}
              />

              {errors.startDate?.message && (
                <FormHelperText error>
                  {errors.startDate.message}
                </FormHelperText>
              )}
            </Grid>

            {/* End Date */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel>
                End Date
              </InputLabel>

              <OutlinedInput
                {...register(
                  'endDate',
                  {
                    ...endDateSchema,
                    validate: (value) => {
                      if (
                        startDate &&
                        value < startDate
                      ) {
                        return 'End date cannot be before start date';
                      }

                      return true;
                    }
                  }
                )}
                type="date"
                fullWidth
                error={Boolean(errors.endDate)}
                sx={inputSx}
                inputProps={{
                  min: startDate || new Date()
                    .toISOString()
                    .split('T')[0]
                }}
              />

              {errors.endDate?.message && (
                <FormHelperText error>
                  {errors.endDate.message}
                </FormHelperText>
              )}
            </Grid>

            {/* Total Days */}
            {/* <Grid size={{ xs: 12, sm: 6 }}>
              <InputLabel>
                Total Days
              </InputLabel>

              <OutlinedInput
                value={totalDays}
                fullWidth
                disabled
                sx={inputSx}
              />
            </Grid> */}

            {/* Reason */}
            <Grid size={{ xs: 12 }}>
              <InputLabel>
                Reason
              </InputLabel>

              <OutlinedInput
                {...register(
                  'reason',
                  reasonSchema
                )}
                placeholder="Enter reason for leave"
                fullWidth
                multiline
                minRows={4}
                error={Boolean(errors.reason)}
                sx={inputSx}
              />

              {errors.reason?.message && (
                <FormHelperText error>
                  {errors.reason.message}
                </FormHelperText>
              )}
            </Grid>

          </Grid>
        </form>
      </DialogContent>
      {/* Buttons */}
      <Divider />
      <DialogActions sx={{ justifyContent: 'start', p: '16px 24px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 1.5,
            mt: 3
          }}
        >
          <Button
            variant="outlined"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="applyLeave-form"
            color="primary"
            variant="contained"
            disabled={isProcessing}
            endIcon={
              isProcessing && (
                <CircularProgress
                  color="secondary"
                  size={16}
                />
              )
            }
          >
            Apply Leave
          </Button>
        </Box>
      </DialogActions>
      {registerError && (
        <Alert
          sx={{ mt: 2 }}
          severity="error"
          variant="filled"
          icon={false}
        >
          {registerError}
        </Alert>
      )}


    </Dialog>
  );
};

export default ApplyLeaveModal;