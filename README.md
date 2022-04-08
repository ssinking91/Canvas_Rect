## 🔥 HTMLCanvasElement.getContext()

<br/>

- HTMLCanvasElement.getContext() 메소드는 캔버스의 드로잉 컨텍스트를 반환

<br/>

```javascript
var ctx = canvas.getContext(contextType);
var ctx = canvas.getContext(contextType, contextAttributes);
```

- 👉 contextType
  캔버스에 연관된 드로잉 컨텍스트를 정의하는 컨텍스트 식별자를 갖는 DOMString입니다. 가능한 값은 다음과 같습니다.

  - "2d", 2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D (en-US) 객체를 생성하게 합니다.

    <br/>

- 👉 contextAttributes
  렌더링 컨텍스트를 생성할 때 몇 가지 컨텍스트 속성을 사용할 수 있습니다.

 <br/>

## 🔥 캔버스(canvas)를 이용한 도형 그리기

<br/>

```javascript
fillRect(x, y, width, height)
색칠된 직사각형을 그립니다.

strokeRect(x, y, width, height)
직사각형 윤곽선을 그립니다.

clearRect(x, y, width, height)
특정 부분을 지우는 직사각형이며, 이 지워진 부분은 완전히 투명해집니다.

```

<br/>

- 👉 직사각형 도형 예제
  <br/>

```javascript
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}
```

<br/>

## 🔥 스타일과 색 적용하기

<br/>

- 👉 도형에 색을 적용하고자 하면, fillStyle과 strokeStyle 두 가지 중요한 속성을 사용할 수 있습니다.

<br/>

```javascript
fillStyle = color

도형을 채우는 색을 설정합니다.

strokeStyle = color

도형의 윤곽선 색을 설정합니다.
```

<br/>

## 🔥 텍스트 그리기

<br/>

- 👉 캔버스 렌더링 컨텍스트(canvas rendering context)는 텍스트를 렌더링하는 두 가지 방법을 제공

<br/>

```javascript
fillText(text, x, y [, maxWidth])

주어진 (x, y) 위치에 주어진 텍스트를 채웁니다. 최대 폭(width)은 옵션 값 입니다.

strokeText(text, x, y [, maxWidth])

주어진 (x, y) 위치에 주어진 텍스트를 칠(stroke)합니다. 최대 폭(width)은 옵션 값 입니다.
```

<br/>

- 👉 fillText 예제 : 텍스트는 현재의 fillStyle을 사용하여 채워집니다.
  <br/>

```javascript
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}
```

<br/>

- 👉 strokeText 예제 : 텍스트는 현재의 strokeStyle을 이용하여 채워집니다.
  <br/>

```javascript
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 10, 50);
}
```
