import React, { useEffect, useState } from 'react';

interface Book {
  _id: string;
  googleBooksId: string;
  title: string;
  author: string;
  // Add other properties as needed
}

interface MyLendingLibraryProps {
  token: string | null;
  setRefetchCounter: React.Dispatch<React.SetStateAction<number>>;
  refetchCounter: number;
}

const MyLendingLibrary: React.FC<MyLendingLibraryProps> = ({ token, setRefetchCounter, refetchCounter  }) => {
  const [myBooks, setMyBooks] = useState<Book[]>([]);



  const fetchBooksOwnedByUser = async () => {
    if (!token) {
      console.error('Token not provided.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/books/my-library', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        console.error('Server response:', response.statusText);
        return;
      }
      const data: Book[] = await response.json();
      setMyBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!token) {
      console.error('Token not provided.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5001/books/delete-offer/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        // Re-fetch books to update the UI
        setRefetchCounter(prev => prev + 1);  // Increment the counter

      } else {
        console.error('Failed to delete book');
      }
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };
  
  useEffect(() => {
    fetchBooksOwnedByUser();
  }, []); // Empty dependency array to run once on mount
  useEffect(() => {
    fetchBooksOwnedByUser();
  }, [refetchCounter]);
  
  return (
    <div>
      {myBooks.length === 0 ? (
        <p>You don't have any books in your library yet.</p>
      ) : (
        <>
          <h1>You are offering to lend the following books:</h1>
          <ul>
            {myBooks.map((book) => (
              <li key={book._id || book.googleBooksId}>
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <button onClick={() => handleDeleteBook(book._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
  
};

export default MyLendingLibrary;
