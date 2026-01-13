interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
