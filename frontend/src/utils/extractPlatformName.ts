// utils/extractPlatformName.ts
export function extractPlatformName(input: string | string[]): string {
  // Garante que trabalhamos com um array de partes
  const titleParts = Array.isArray(input)
    ? input
    : String(input).split(/[\s\-_]+/).filter(Boolean);

  // Lista de padrões com transformador seguro (recebe o match array)
  const patterns: { regex: RegExp; transform: (m: RegExpExecArray) => string }[] = [
    // LC08, LC-08, LC_08, LC 08  -> Landsat 8
    {
      regex: /(LC)[\s\-_]*0*(\d+)/i,
      transform: (m) => {
        // m[2] existe porque a regex captura dígitos no segundo grupo
        const num = m[2];
        return `Landsat ${num}`;
      }
    },
    // Landsat-8, Landsat 9
    {
      regex: /Landsat[\s\-_]*0*(\d+)/i,
      transform: (m) => `Landsat ${m[1]}`
    },
    // S2A, S2B, S3, S5A, etc -> Sentinel-2A, Sentinel-3
    {
      regex: /\b(S)(\d+)([A-Z]?)\b/i,
      transform: (m) => {
        const number = m[2];
        const letter = (m[3] || "").toUpperCase();
        return `Sentinel-${number}${letter}`;
      }
    },
    // Sentinel-2A written as "Sentinel 2A" or "Sentinel-2"
    {
      regex: /Sentinel[\s\-_]*(\d+)([A-Z]?)/i,
      transform: (m) => `Sentinel-${m[1]}${(m[2] || "").toUpperCase()}`
    },
    // CBERS-4A, CBERS 4
    {
      regex: /CBERS[\s\-_]*([0-9]+[A-Z]?)/i,
      transform: (m) => `CBERS-${m[1].toUpperCase()}`
    },
    // NOAA-20, NOAA 20
    {
      regex: /NOAA[\s\-_]*(\d+)/i,
      transform: (m) => `NOAA-${m[1]}`
    },
    // GOES-16, GOES 16
    {
      regex: /GOES[\s\-_]*(\d+)/i,
      transform: (m) => `GOES-${m[1]}`
    },
    // Aqua / Terra / MODIS
    { regex: /\bAqua\b/i, transform: () => "Aqua" },
    { regex: /\bTerra\b/i, transform: () => "Terra" },
    { regex: /\bMODIS\b/i, transform: () => "MODIS" }
  ];

  // Varre cada parte e testa cada regex com exec (mais seguro que match direto)
  for (const part of titleParts) {
    for (const { regex, transform } of patterns) {
      const m = regex.exec(part);
      if (m) {
        try {
          return transform(m);
        } catch {
          // se o transform falhar por algum motivo, continua para o próximo padrão
          continue;
        }
      }
    }
  }

  // Se nada bateu, tenta checar a string inteira (caso o nome esteja mais longo)
  const whole = Array.isArray(input) ? input.join(" ") : String(input);
  for (const { regex, transform } of patterns) {
    const m = regex.exec(whole);
    if (m) {
      try {
        return transform(m);
      } catch {
        continue;
      }
    }
  }

  return "Plataforma";
}
