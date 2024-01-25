import { ApiErrorResponse } from '../types';

interface ErrorProps {
  reesponse: ApiErrorResponse;
}

const Error = ({ reesponse }: ErrorProps) => {
  const { message } = reesponse.response.data;

  if (typeof message === "string") {
    return <p className="text-danger">{message}</p>;
  }

  return (
    <div>
      {message.length > 0 ? (
        message?.map((e) => (
          <p className="text-danger" key={e}>
            {e}
          </p>
        ))
      ) : (
        <p className="text-danger">{message}</p>
      )}
    </div>
  );
};

export default Error;
