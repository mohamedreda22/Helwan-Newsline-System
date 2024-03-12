Below is a README.md file for your npm package. It provides an overview of the package, installation instructions, usage examples, and additional information for users.

# React Custom Hooks

A collection of custom React hooks to enhance your React applications.

## Installation

You can install the package via npm:

```bash
npm install @mohamed_reda/pagination-alert
```

## Usage

### useAlert

A hook for managing alerts in React applications.

```javascript
import { useAlert } from "@mohamed_reda/pagination-alert";

function MyComponent() {
  const {
    showAlert,
    showAlertHandler,
    hideAlertHandler,
    alertType,
    alertTitle,
    alertMessage,
    customCloseBtnText,
  } = useAlert();

  // Usage example
  // showAlertHandler('success', 'Success', 'Operation completed successfully', 'Close');

  return (
    <div>
      {showAlert && (
        <div className={`alert ${alertType}`}>
          <h3>{alertTitle}</h3>
          <p>{alertMessage}</p>
          {customCloseBtnText && (
            <button onClick={hideAlertHandler}>{customCloseBtnText}</button>
          )}
        </div>
      )}
      {/* Your component content */}
    </div>
  );
}
```

### usePagination

A hook for implementing pagination in React applications.

```javascript
import { usePagination } from "@your-username/react-custom-hooks";

function MyComponent() {
  const {
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToLastPage,
  } = usePagination(100, 10);

  // Usage example
  // <button onClick={goToNextPage}>Next</button>

  return (
    <div>
      {/* Pagination controls */}
      <button onClick={goToFirstPage}>First</button>
      <button onClick={goToPrevPage}>Previous</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={goToNextPage}>Next</button>
      <button onClick={goToLastPage}>Last</button>
      {/* Your component content */}
    </div>
  );
}
```