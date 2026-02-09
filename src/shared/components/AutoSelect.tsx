import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import { colSpanMap } from "../../utils";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

interface AutoSelectProps<T> {
  placeholder?: string;
  apiEndpoint: string;
  limit?: number;
  size?: number;
  onSelect: (item: T) => void;
  getLabel?: (item: T) => string;
  getKey?: (item: T) => string | number;
  inputIcon?: IconType;
}

function AutoSelect<T>({
  placeholder = "Search...",
  apiEndpoint,
  limit = 5,
  size = 12,
  onSelect,
  getLabel = (item: any) => item.label ?? item.name ?? "",
  getKey = (item: any) => item.id ?? getLabel(item),
  inputIcon: InputIcon,
}: AutoSelectProps<T>) {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const debounceRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Fetch options */
  useEffect(() => {
    if (!query.trim()) {
      setOptions([]);
      setOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(async () => {
      try {
        setLoading(true);

        const url = new URL(apiEndpoint);
        url.searchParams.set("searchTerm", query);

        const res = await fetch(url.toString());
        const data = await res.json();

        const results: T[] = Array.isArray(data) ? data : (data.results ?? []);

        setOptions(results.slice(0, limit));
        setOpen(true);
      } catch (err) {
        console.error("Autocomplete failed", err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, apiEndpoint, limit]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${colSpanMap[size]}`}>
      {/* Input */}
      <div className="relative">
        {InputIcon && (
          <InputIcon
            width={16}
            height={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        )}

        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-(--primary)
            ${InputIcon ? "pl-10" : ""}
          `}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {loading && (
            <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
          )}

          {!loading && options.length === 0 && (
            <div className="px-4 py-2 text-sm text-gray-400">No results</div>
          )}

          {!loading &&
            options.map((item) => {
              return (
                <div
                  key={getKey(item)}
                  onClick={() => {
                    onSelect(item);
                    setQuery(getLabel(item));
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-(--primary-light)"
                >
                  <span>{getLabel(item)}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default AutoSelect;
