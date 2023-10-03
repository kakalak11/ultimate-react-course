export default function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li key={item.id}>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button style={{ color: "red" }} onClick={() => onDeleteItem(item.id)}>
        X
      </button>
    </li>
  );
}
