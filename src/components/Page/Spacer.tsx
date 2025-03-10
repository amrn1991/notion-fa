import styles from './Spacer.module.css';

type SpacerProps = {
  handleClick(): void;
  showHint: boolean;
};

export default function Spacer({handleClick, showHint}: SpacerProps) {
  return (
    <div className={styles.spacer} onClick={handleClick}>
      {showHint && 'برای ساخت پاراگراف کلیک کنید'}
    </div>
  );
}
