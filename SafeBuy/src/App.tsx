import CautionInfo from './components/CautionInfo';

export default function App() {
  return (
    <div className="p-6 max-w-sm">
      <CautionInfo intervalMs={3000} />
    </div>
  );
}