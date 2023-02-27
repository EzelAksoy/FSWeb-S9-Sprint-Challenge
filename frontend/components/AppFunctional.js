import React from "react";
import { useState } from "react";
import axios from "axios";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi
const dummyData = {
  message: "",
  email: "",
  steps: 0,
  index: 4,
};
export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.
  const [data, setData] = useState(dummyData);

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    return { x: (data.index % 3) + 1, y: Math.floor(data.index / 3) + 1 };
  }

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.,
    return `Koordinatlar (${getXY().x}, ${getXY().y})`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setData(dummyData);
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    let nextIndeks = data.index;
    if (yon === "left") {
      if (data.index % 3 !== 0) {
        nextIndeks = data.index - 1;
      } else {
        setData({ ...data, message: "Sola gidemezsiniz" });
      }
    }
    if (yon === "up") {
      if (data.index / 3 >= 1) {
        nextIndeks = data.index - 3;
      } else {
        setData({ ...data, message: "Yukarıya gidemezsiniz" });
      }
    }

    if (yon === "right") {
      if (data.index % 3 < 2) {
        nextIndeks = data.index + 1;
      } else {
        setData({ ...data, message: "Sağa gidemezsiniz" });
      }
    }
    if (yon === "down") {
      if (data.index / 3 < 2) {
        nextIndeks = data.index + 3;
      } else {
        setData({ ...data, message: "Aşağıya gidemezsiniz" });
      }
    }
    return nextIndeks;
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    let newState = sonrakiIndex(evt.target.id);
    if (newState !== data.index) {
      setData({ ...data, message: "", steps: data.steps + 1, index: newState });
    }
  }

  function onChange(evt) {
    if (evt.target.id === "reset") {
      reset();
    } else if (evt.target.id === "email") {
      setData({ ...data, email: evt.target.value });
    } else {
      ilerle(evt);
    }
    // inputun değerini güncellemek için bunu kullanabilirsiniz
  }
  console.log(data);
  function onSubmit(evt) {
    evt.preventDefault();
    let sentIt = {
      x: getXY().x,
      y: getXY().y,
      steps: data.steps,
      email: data.email,
    };
    if (data.email === "") {
      setData({ ...data, ["message"]: "Ouch: email is required" });
    } else {
      axios
        .post("http://localhost:9000/api/result", sentIt)
        .then((result) => {
          setData({
            ...data,
            ["email"]: "",
            ["message"]: result.data.message,
          });
        })
        .catch((err) =>
          setData({ ...data, ["message"]: err.response.data.message })
        );
    }
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
  }
  const sayılar = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{data.steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === data.index ? " active" : ""}`}
          >
            {idx === data.index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{data.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={onChange} data-testid="sol-button">
          SOL
        </button>
        <button id="up" onClick={onChange} data-testid="yukari-button">
          YUKARI
        </button>
        <button id="right" onClick={onChange} data-testid="sağ-button">
          SAĞ
        </button>
        <button id="down" onClick={onChange} data-testid="aşaği-button">
          AŞAĞI
        </button>
        <button id="reset" onClick={onChange} data-testid="reset-button">
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
          value={data.email}
          data-testid="mail-input"
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
