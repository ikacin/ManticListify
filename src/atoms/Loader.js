import { Loader } from '@mantine/core';

function Loading({size,variant}) {
    return <Loader
            size={size ?? "xs"}
            variant={variant ?? "bars"}
    />;
}

export default Loading