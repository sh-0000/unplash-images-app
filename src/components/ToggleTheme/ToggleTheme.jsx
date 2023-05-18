import { useGlobalContext } from "../../context";

const ToggleTheme = () => {
  const { toggleTheme, isDarkTheme } = useGlobalContext();
  return (
    <section className="toggle_container">
      <input
        className="toggle"
        onClick={toggleTheme}
        defaultChecked={isDarkTheme}
        type="checkbox"
      />
      <div className="curtain"></div>
    </section>
  );
};

export default ToggleTheme;
