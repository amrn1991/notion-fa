import { useEffect, useRef, useState } from "react";

export const useSyncedState = <TState>(
  initialState: TState,
  syncCallback: (state: TState) => void
): [TState, React.Dispatch<React.SetStateAction<TState>>] => {
  const [state, setState] = useState(initialState)
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) syncCallback(state);
    didMountRef.current = true;
  }, [state, setState])

  return [state, setState]
}