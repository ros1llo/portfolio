function SocialLinks({ items, className = "" }) {
  return (
    <ul className={`social-links ${className}`}>
      {items.map((item) => {
        const isExternal = item.url.startsWith("http");
        const target = isExternal ? "_blank" : undefined;
        const rel = isExternal ? "noreferrer" : undefined;

        return (
          <li key={item.id}>
            <a href={item.url} target={target} rel={rel}>{item.label}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;