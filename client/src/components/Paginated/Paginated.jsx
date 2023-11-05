/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from "./Paginated.module.css";

const Paginated = ({
  videogamesPerPage,
  allVideogames,
  paginado,
  currentPage,
}) => {
  const pageNumbers = [];

  const totalPages = Math.ceil(allVideogames / videogamesPerPage);

  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <a
                className={number === currentPage ? styles.selectedPage : ""}
                onClick={() => paginado(number)}
              >
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Paginated;
