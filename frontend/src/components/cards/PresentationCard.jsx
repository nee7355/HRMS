import PropTypes from 'prop-types';

// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// @project
import MainCard from '@/components/MainCard';

/***************************  PRESENTATION CARD  ***************************/

export default function PresentationCard({ title, children, cardSx }) {
  return (
    <MainCard sx={cardSx}>
      <Stack sx={{  }}>
        {title&&<Typography variant="h6" sx={{ fontWeight: 400 }}>
          {title}
        </Typography>}
        {children}
      </Stack>
    </MainCard>
  );
}

PresentationCard.propTypes = { title: PropTypes.string, children: PropTypes.any };
