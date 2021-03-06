## π Β κΈ°λ₯ μμ°Β 

<br/>

<div align="center">
    <img width="500px" height="300px" src="https://user-images.githubusercontent.com/89959952/162361960-17350994-aa51-4a00-ba52-06887a10d2ad.gif"/>
</div>

<br/>

## π₯ HTMLCanvasElement.getContext()

<br/>

- HTMLCanvasElement.getContext() λ©μλλ μΊλ²μ€μ λλ‘μ μ»¨νμ€νΈλ₯Ό λ°ν

<br/>

```javascript
var ctx = canvas.getContext(contextType);
var ctx = canvas.getContext(contextType, contextAttributes);
```

- π contextType
  μΊλ²μ€μ μ°κ΄λ λλ‘μ μ»¨νμ€νΈλ₯Ό μ μνλ μ»¨νμ€νΈ μλ³μλ₯Ό κ°λ DOMStringμλλ€. κ°λ₯ν κ°μ λ€μκ³Ό κ°μ΅λλ€.

  - "2d", 2μ°¨μ λ λλ§ μ»¨νμ€νΈλ₯Ό λνλ΄λ CanvasRenderingContext2D (en-US) κ°μ²΄λ₯Ό μμ±νκ² ν©λλ€.

    <br/>

- π contextAttributes
  λ λλ§ μ»¨νμ€νΈλ₯Ό μμ±ν  λ λͺ κ°μ§ μ»¨νμ€νΈ μμ±μ μ¬μ©ν  μ μμ΅λλ€.

 <br/>

## π₯ μΊλ²μ€(canvas)λ₯Ό μ΄μ©ν λν κ·Έλ¦¬κΈ°

<br/>

```javascript
fillRect(x, y, width, height)
μμΉ λ μ§μ¬κ°νμ κ·Έλ¦½λλ€.

strokeRect(x, y, width, height)
μ§μ¬κ°ν μ€κ³½μ μ κ·Έλ¦½λλ€.

clearRect(x, y, width, height)
νΉμ  λΆλΆμ μ§μ°λ μ§μ¬κ°νμ΄λ©°, μ΄ μ§μμ§ λΆλΆμ μμ ν ν¬λͺν΄μ§λλ€.

```

<br/>

- π μ§μ¬κ°ν λν μμ 
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

## π₯ μ€νμΌκ³Ό μ μ μ©νκΈ°

<br/>

- π λνμ μμ μ μ©νκ³ μ νλ©΄, fillStyleκ³Ό strokeStyle λ κ°μ§ μ€μν μμ±μ μ¬μ©ν  μ μμ΅λλ€.

<br/>

```javascript
fillStyle = color

λνμ μ±μ°λ μμ μ€μ ν©λλ€.

strokeStyle = color

λνμ μ€κ³½μ  μμ μ€μ ν©λλ€.
```

<br/>

## π₯ νμ€νΈ κ·Έλ¦¬κΈ°

<br/>

- π μΊλ²μ€ λ λλ§ μ»¨νμ€νΈ(canvas rendering context)λ νμ€νΈλ₯Ό λ λλ§νλ λ κ°μ§ λ°©λ²μ μ κ³΅

<br/>

```javascript
fillText(text, x, y [, maxWidth])

μ£Όμ΄μ§ (x, y) μμΉμ μ£Όμ΄μ§ νμ€νΈλ₯Ό μ±μλλ€. μ΅λ ν­(width)μ μ΅μ κ° μλλ€.

strokeText(text, x, y [, maxWidth])

μ£Όμ΄μ§ (x, y) μμΉμ μ£Όμ΄μ§ νμ€νΈλ₯Ό μΉ (stroke)ν©λλ€. μ΅λ ν­(width)μ μ΅μ κ° μλλ€.
```

<br/>

- π fillText μμ  : νμ€νΈλ νμ¬μ fillStyleμ μ¬μ©νμ¬ μ±μμ§λλ€.
  <br/>

```javascript
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}
```

<br/>

- π strokeText μμ  : νμ€νΈλ νμ¬μ strokeStyleμ μ΄μ©νμ¬ μ±μμ§λλ€.
  <br/>

```javascript
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 10, 50);
}
```
