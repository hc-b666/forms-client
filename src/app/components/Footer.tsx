import { useIntl } from "react-intl";

export default function Footer() {
  const intl = useIntl();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="container py-5 mt-auto">
      <p className="text-xs text-center md:text-left">
        Copyright &copy; {currentYear}, Muhammadbobur.&nbsp;{intl.formatMessage({ id: "footer.copyright" })}
      </p>
    </footer>
  );
};
