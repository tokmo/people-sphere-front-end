import { Link } from 'react-router-dom';

export interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <>
      <nav className="d-flex align-items-center justify-content-between">
        <h1 className="h3">{title}</h1>
        <ul className="list-unstyled d-flex align-items-center m-0 p-0">
          <li>
            <Link to="/add">Add product</Link>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  );
};
