import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
          Built with love by
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              target="_blank"
              to={"https://github.com/sushant1123"}
            >
              Sushant Bahirat
            </Link>
          </span>
          with the help of
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              target="_blank"
              to={"https://youtube.com/indiancoders"}
            >
              Indian Coders
            </Link>
          </span>
          💘
        </p>
      </div>
    </footer>
  );
};

export default Footer;
