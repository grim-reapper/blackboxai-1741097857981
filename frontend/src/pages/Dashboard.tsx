import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

// Mock data for demonstration
const mockArticles = [
  {
    id: '1',
    title: 'The Future of AI in Content Creation',
    status: 'completed',
    createdAt: '2024-03-15T10:00:00Z',
    tone: 'Professional',
  },
  {
    id: '2',
    title: 'How to Write Engaging Blog Posts',
    status: 'processing',
    createdAt: '2024-03-14T15:30:00Z',
    tone: 'Casual',
  },
  {
    id: '3',
    title: '10 Tips for Better SEO',
    status: 'failed',
    createdAt: '2024-03-13T09:15:00Z',
    tone: 'Informative',
  },
];

function Dashboard() {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = (filter?: string) => {
    if (filter) {
      setSelectedFilter(filter);
    }
    setFilterAnchorEl(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'processing':
        return <ScheduleIcon sx={{ color: 'warning.main' }} />;
      case 'failed':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      default:
        return null;
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Chip
            size="small"
            label="Completed"
            color="success"
            sx={{ minWidth: 100 }}
          />
        );
      case 'processing':
        return (
          <Chip
            size="small"
            label="Processing"
            color="warning"
            sx={{ minWidth: 100 }}
          />
        );
      case 'failed':
        return (
          <Chip
            size="small"
            label="Failed"
            color="error"
            sx={{ minWidth: 100 }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1">
            Your Articles
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="large"
          >
            New Article
          </Button>
        </Box>

        {/* Search and Filter */}
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={8}>
              <TextField
                fullWidth
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleFilterClick}
              >
                {selectedFilter === 'all' ? 'All Articles' : selectedFilter}
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={() => handleFilterClose()}
              >
                <MenuItem onClick={() => handleFilterClose('all')}>
                  All Articles
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose('completed')}>
                  Completed
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose('processing')}>
                  Processing
                </MenuItem>
                <MenuItem onClick={() => handleFilterClose('failed')}>
                  Failed
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Paper>

        {/* Articles List */}
        <Stack spacing={2}>
          {mockArticles.map((article) => (
            <Card key={article.id}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {getStatusIcon(article.status)}
                      <Typography variant="subtitle1">{article.title}</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    {getStatusChip(article.status)}
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                    >
                      <IconButton color="primary" size="small">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Empty State */}
        {mockArticles.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: theme.palette.background.default,
            }}
          >
            <EditIcon
              sx={{
                fontSize: 48,
                color: 'text.secondary',
                mb: 2,
              }}
            />
            <Typography variant="h6" gutterBottom>
              No articles yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get started by creating your first article
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
            >
              New Article
            </Button>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}

export default Dashboard;
