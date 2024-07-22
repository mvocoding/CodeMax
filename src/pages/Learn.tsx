import Tab from "../components/Tab";

interface Props {
  className?: string;
}

const grid = {
  "title": "Understanding `grid-template-rows` in CSS Grid",
  "definition": "The `grid-template-rows` property in CSS Grid Layout specifies the number and size of the rows in a grid container. It defines the height of each row in the grid, allowing you to control how grid items are distributed vertically.",
  "syntax": "grid-template-rows: <track-size> [<track-size> ...];",
  "track-size": "Defines the size of a row. It can be a fixed value (e.g., px, em), a percentage, or a flexible value (fr unit).",
  "when_to_use": [
    "Create Consistent Layouts: Define specific row heights for headers, footers, or other sections.",
    "Design Responsively: Adjust row sizes for different screen sizes.",
    "Handle Dynamic Content: Control row sizes to fit varying content heights."
  ],
  "examples": [
    {
      "example": "Fixed Row Heights",
      "html": "<div class=\"grid-fixed\">\n  <div class=\"item\">Header</div>\n  <div class=\"item\">Content</div>\n  <div class=\"item\">Footer</div>\n</div>",
      "css": ".grid-fixed {\n  display: grid;\n  grid-template-rows: 100px auto 50px; /* Header: 100px, Content: auto, Footer: 50px */\n  gap: 10px; /* Space between rows */\n}\n.item {\n  background-color: #ccc;\n  padding: 20px;\n}",
      "explanation": [
        "Header: 100px tall.",
        "Content: Takes up the remaining space (auto).",
        "Footer: 50px tall."
      ]
    },
    {
      "example": "Flexible Row Heights",
      "html": "<div class=\"grid-flexible\">\n  <div class=\"item\">Header</div>\n  <div class=\"item\">Content</div>\n  <div class=\"item\">Footer</div>\n</div>",
      "css": ".grid-flexible {\n  display: grid;\n  grid-template-rows: 1fr 2fr 1fr; /* Header: 1 fraction, Content: 2 fractions, Footer: 1 fraction */\n  gap: 10px; /* Space between rows */\n}\n.item {\n  background-color: #ccc;\n  padding: 20px;\n}",
      "explanation": [
        "Header: Takes up 1 fraction of the available space.",
        "Content: Takes up 2 fractions, making it twice as tall as the first and third rows.",
        "Footer: Takes up 1 fraction."
      ]
    },
    {
      "example": "Mixed Units",
      "html": "<div class=\"grid-mixed\">\n  <div class=\"item\">Header</div>\n  <div class=\"item\">Content</div>\n  <div class=\"item\">Footer</div>\n</div>",
      "css": ".grid-mixed {\n  display: grid;\n  grid-template-rows: 100px minmax(200px, auto) 50px; /* Header: 100px, Content: min 200px or auto, Footer: 50px */\n  gap: 10px; /* Space between rows */\n}\n.item {\n  background-color: #ccc;\n  padding: 20px;\n}",
      "explanation": [
        "Header: 100px tall.",
        "Content: Minimum height of 200px but can grow (minmax(200px, auto)).",
        "Footer: 50px tall."
      ]
    }
  ],
  "summary": "The `grid-template-rows` property helps define the vertical spacing and layout of grid items. Use it to set fixed, flexible, or mixed row sizes based on your design needs."
}

const CodeBlock = ({ codeString }) => (
  <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
    <code>{codeString}</code>
  </pre>
);


const Learn = () => (
  <div className="container mx-auto p-6 bg-black/50">
    <header className="mb-6 text-center">
      <h1 className="text-3xl font-bold">Understanding `grid-template-rows` in CSS Grid</h1>
    </header>

    <section className="bg-black/80 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Definition</h2>
      <p className="mb-4">
        The <code className="bg-black/50 p-1 rounded">grid-template-rows</code> property in CSS Grid Layout specifies the number and size of the rows in a grid container. It defines the height of each row in the grid, allowing you to control how grid items are distributed vertically.
      </p>
      <CodeBlock codeString="grid-template-rows: <track-size> [<track-size> ...];" />
      <p className="mt-4">
        <strong>&lt;track-size&gt;</strong>: Defines the size of a row. It can be a fixed value (e.g., <code>px</code>, <code>em</code>), a percentage, or a flexible value (<code>fr</code> unit).
      </p>
    </section>

    <section className="mt-6 bg-black/80 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">When to Use `grid-template-rows`</h2>
      <ul className="list-disc pl-6">
        <li><strong>Create Consistent Layouts:</strong> Define specific row heights for headers, footers, or other sections.</li>
        <li><strong>Design Responsively:</strong> Adjust row sizes for different screen sizes.</li>
        <li><strong>Handle Dynamic Content:</strong> Control row sizes to fit varying content heights.</li>
      </ul>
    </section>

    <section className="mt-6 bg-black/80 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Examples</h2>

      {/* Example 1 */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Example 1: Fixed Row Heights</h3>
        <div className="bg-black/50 p-4 rounded-md">
          <h4 className="font-semibold mb-2">HTML:</h4>
          <CodeBlock codeString={`<div class="grid-fixed">
  <div class="item">Header</div>
  <div class="item">Content</div>
  <div class="item">Footer</div>
</div>`} />
          <h4 className="font-semibold mt-4 mb-2">CSS:</h4>
          <CodeBlock codeString={`.grid-fixed {
  display: grid;
  grid-template-rows: 100px auto 50px; /* Header: 100px, Content: auto, Footer: 50px */
  gap: 10px; /* Space between rows */
}
.item {
  background-color: #ccc;
  padding: 20px;
}`} />
          <p className="mt-4"><strong>Explanation:</strong></p>
          <ul className="list-disc pl-6">
            <li><strong>Header:</strong> 100px tall.</li>
            <li><strong>Content:</strong> Takes up the remaining space (auto).</li>
            <li><strong>Footer:</strong> 50px tall.</li>
          </ul>
        </div>
      </div>

      {/* Example 2 */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Example 2: Flexible Row Heights</h3>
        <div className="bg-black/50 p-4 rounded-md">
          <h4 className="font-semibold mb-2">HTML:</h4>
          <CodeBlock codeString={`<div class="grid-flexible">
  <div class="item">Header</div>
  <div class="item">Content</div>
  <div class="item">Footer</div>
</div>`} />
          <h4 className="font-semibold mt-4 mb-2">CSS:</h4>
          <CodeBlock codeString={`.grid-flexible {
  display: grid;
  grid-template-rows: 1fr 2fr 1fr; /* Header: 1 fraction, Content: 2 fractions, Footer: 1 fraction */
  gap: 10px; /* Space between rows */
}
.item {
  background-color: #ccc;
  padding: 20px;
}`} />
          <p className="mt-4"><strong>Explanation:</strong></p>
          <ul className="list-disc pl-6">
            <li><strong>Header:</strong> Takes up 1 fraction of the available space.</li>
            <li><strong>Content:</strong> Takes up 2 fractions, making it twice as tall as the first and third rows.</li>
            <li><strong>Footer:</strong> Takes up 1 fraction.</li>
          </ul>
        </div>
      </div>

      {/* Example 3 */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Example 3: Mixed Units</h3>
        <div className="bg-black/50 p-4 rounded-md">
          <h4 className="font-semibold mb-2">HTML:</h4>
          <CodeBlock codeString={`<div class="grid-mixed">
  <div class="item">Header</div>
  <div class="item">Content</div>
  <div class="item">Footer</div>
</div>`} />
          <h4 className="font-semibold mt-4 mb-2">CSS:</h4>
          <CodeBlock codeString={`.grid-mixed {
  display: grid;
  grid-template-rows: 100px minmax(200px, auto) 50px; /* Header: 100px, Content: min 200px or auto, Footer: 50px */
  gap: 10px; /* Space between rows */
}
.item {
  background-color: #ccc;
  padding: 20px;
}`} />
          <p className="mt-4"><strong>Explanation:</strong></p>
          <ul className="list-disc pl-6">
            <li><strong>Header:</strong> 100px tall.</li>
            <li><strong>Content:</strong> Minimum height of 200px but can grow (minmax(200px, auto)).</li>
            <li><strong>Footer:</strong> 50px tall.</li>
          </ul>
        </div>
      </div>
    </section>

    <footer className="mt-6 text-center text-gray-600">
      <p>Summary: The <code className="bg-gray-200 p-1 rounded">grid-template-rows</code> property helps define the vertical spacing and layout of grid items. Use it to set fixed, flexible, or mixed row sizes based on your design needs.</p>
    </footer>
  </div>
);

export default Learn;