// @mui
import Typography from '@mui/material/Typography';

// @project
import ComponentsWrapper from '@/components/ComponentsWrapper';
import PresentationCard from '@/components/cards/PresentationCard';

/***************************  SAMPLE PAGE  ***************************/

export default function SamplePage() {
  return (
    <ComponentsWrapper title="Sample Page">
      <PresentationCard title="Basic Card">
        <Typography variant="body2" color="text.secondary">
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, pariatur. Doloribus, eos quo doloremque laudantium distinctio, quia temporibus culpa ea, delectus odio veritatis repellendus nulla minima voluptatem labore dignissimos quidem.
        </Typography>
      </PresentationCard>
    </ComponentsWrapper>
  );
}
