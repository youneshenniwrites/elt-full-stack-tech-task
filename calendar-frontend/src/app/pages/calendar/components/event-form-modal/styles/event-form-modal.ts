import { css } from '@emotion/react';

export const ModalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  > div {
    background: white;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 20px;
    width: 400px;
    max-width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    label {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-weight: 500;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    div {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 10px;

      button {
        color: #373a3c;
        background: none;
        border: 1px solid #ccc;
        padding: 0.375rem 1rem;
        border-radius: 4px;
        white-space: nowrap;

        &:hover {
          background-color: rgb(229.5, 229.5, 229.5);
          border-color: rgb(173.4, 173.4, 173.4);
          cursor: pointer;
        }

        &:active {
          box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        }

        &:disabled {
          background-color: #ccc;
          color: #fff;
          pointer-events: none;
        }
      }
    }
  }
`;
