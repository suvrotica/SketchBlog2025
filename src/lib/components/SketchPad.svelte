<!-- src/lib/components/SketchPad.svelte -->
<script lang="ts">
    import { enhance } from '$app/forms';
    
    let { postSlug, previousId = null } = $props<{
      postSlug: string;
      previousId?: string | null;
    }>();
    
    let isDrawing = $state(false);
    let currentPath = $state<string[]>([]);
    let svgContent = $state('');
  
    function startDrawing(event: MouseEvent) {
      isDrawing = true;
      const svg = (event.currentTarget as HTMLButtonElement).querySelector('svg');
      if (!svg) return;
      
      const pt = svg.createSVGPoint();
      const rect = svg.getBoundingClientRect();
      pt.x = event.clientX - rect.left;
      pt.y = event.clientY - rect.top;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      currentPath = [`M${svgP.x},${svgP.y}`];
    }
  
    function draw(event: MouseEvent) {
      if (!isDrawing) return;
      const svg = (event.currentTarget as HTMLButtonElement).querySelector('svg');
      if (!svg) return;
  
      const pt = svg.createSVGPoint();
      const rect = svg.getBoundingClientRect();
      pt.x = event.clientX - rect.left;
      pt.y = event.clientY - rect.top;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      currentPath = [...currentPath, `L${svgP.x},${svgP.y}`];
      
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", currentPath.join(" "));
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "2");
      svg.appendChild(path);
      
      svgContent = svg.innerHTML;
    }
  
    function stopDrawing() {
      isDrawing = false;
    }
  </script>
  
  <form
    method="POST"
    action="?/saveSketch"
    use:enhance
  >
    <input type="hidden" name="postSlug" value={postSlug} />
    <input type="hidden" name="previousId" value={previousId ?? ''} />
    <input type="hidden" name="svgContent" value={svgContent} />
    
    <div class="border border-gray-200 rounded p-4">
      <button
        type="button"
        class="w-full block"
        onmousedown={startDrawing}
        onmousemove={draw}
        onmouseup={stopDrawing}
        onmouseleave={stopDrawing}
      >
        <svg
          viewBox="0 0 800 200"
          preserveAspectRatio="none"
          class="w-full h-48 cursor-crosshair"
        >
          {@html svgContent}
        </svg>
      </button>
      
      <div class="mt-4 flex justify-end gap-2">
        <button
          type="button"
          class="px-4 py-2 bg-red-500 text-white rounded"
          onclick={() => svgContent = ''}
        >
          Clear
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </div>
    </div>
  </form>