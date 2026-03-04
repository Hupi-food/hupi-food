## 2025-03-04 - [HomeScreen and HupiBoxCard Optimization]
**Learning:** Found that `HomeScreen` was filtering `HUPI_BOXES` on every render, even when just toggling the map view. Also, `HupiBoxCard` was re-rendering unnecessarily as part of the list.
**Action:** Applied `useMemo` for filtering in `HomeScreen` and `memo` for `HupiBoxCard` to reduce redundant computations and re-renders.
