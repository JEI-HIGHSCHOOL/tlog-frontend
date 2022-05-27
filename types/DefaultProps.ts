export interface ServerSideProps<
  T extends { [key: string]: any } = { [key: string]: any }
> {
  error: boolean;
  message: string;
  data?: T | null;
}
