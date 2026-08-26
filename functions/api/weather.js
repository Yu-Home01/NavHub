const CACHE_TTL = 1800; // 30分钟缓存

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const city = url.searchParams.get('city')?.trim();

  if (!city) {
    return new Response(JSON.stringify({ code: 400, message: 'Missing city' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cacheKey = `weather:${city}`;

  try {
    // 1. 读缓存
    const cached = await env.NAV_AUTH.get(cacheKey);
    if (cached) {
      return new Response(cached, {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. 请求 wttr.in 天气接口（免费，无需密钥）
    const apiUrl = `https://wttr.in/${encodeURIComponent(city)}?format=j1&lang=zh`;
    const response = await fetch(apiUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ code: 502, message: 'Weather API error: ' + response.status }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 3. 解析数据
    const rawData = await response.json();
    const current = rawData.current_condition?.[0] || {};

    // 4. 转换为前端格式
    const formatted = {
      code: 200,
      data: {
        city: city,
        temp: current.temp_C ? `${current.temp_C}°C` : '--',
        weather: current.lang_zh?.[0]?.value || current.weatherDesc?.[0]?.value || '--',
        wind: current.winddir16Point ? `${current.winddir16Point} ` : '',
        windLevel: current.windspeedKmph ? `${current.windspeedKmph}km/h` : ''
      }
    };

    const resultJson = JSON.stringify(formatted);

    // 5. 写入缓存
    await env.NAV_AUTH.put(cacheKey, resultJson, { expirationTtl: CACHE_TTL });

    // 6. 返回
    return new Response(resultJson, {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (e) {
    console.error('Weather error:', e);
    return new Response(JSON.stringify({ code: 500, message: e.message || 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
