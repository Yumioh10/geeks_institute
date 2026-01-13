interface DataFetcherProps<T> {
  url: string;
  stateKey: string;
  render: (data: T) => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  renderError?: (error: string) => React.ReactNode;
}

function DataFetcher<T>({
  url,
  stateKey,
  render,
  renderLoading,
  renderError
}: DataFetcherProps<T>) {
  const dispatch = useDispatch<AppDispatch>();
  const dataState = useSelector((state: RootState) => 
    state.data[stateKey] as DataState<T> | undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart(stateKey));
      
      try {
        const data = await api.fetchData<T>(url);
        dispatch(fetchSuccess({ key: stateKey, data }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        dispatch(fetchFailure({ key: stateKey, error: errorMessage }));
      }
    };

    fetchData();

    return () => {
      dispatch(clearData(stateKey));
    };
  }, [url, stateKey, dispatch]);

  if (!dataState || dataState.loading) {
    return (
      <div>
        {renderLoading ? renderLoading() : (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        )}
      </div>
    );
  }

  if (dataState.error) {
    return (
      <div>
        {renderError ? renderError(dataState.error) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-semibold">Error:</p>
            <p className="text-red-600">{dataState.error}</p>
          </div>
        )}
      </div>
    );
  }

  if (!dataState.data) {
    return <div className="text-gray-500">No data available</div>;
  }

  return <div>{render(dataState.data)}</div>;
}