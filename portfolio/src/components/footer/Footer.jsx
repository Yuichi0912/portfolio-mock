import "./Footer.scss";

export const Footer = () => {
  return (
    <div className="footer">
      <footer>
        <button>
          {" "}
          <img src="../images/home-2.svg" alt="ホームアイコン" />
        </button>
        <button>
          {" "}
          <img src="../images/message-2.svg" alt="メッセージアイコン" />
        </button>
        <button>
          {" "}
          <img src="../images/bell.svg" alt="通知アイコン" />
        </button>
        <button>
          {" "}
          <img src="../images/user.svg" alt="ユーザーアイコン" />
        </button>

      </footer>
    </div>
  );
};
