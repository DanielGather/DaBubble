import { Injectable, computed, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  public breakpointObserver = inject(BreakpointObserver);

  private smallBreakpoint = toSignal(
    this.breakpointObserver.observe('(max-width: 768px)')
  );

  private mediumBreakpoint = toSignal(
    this.breakpointObserver.observe(
      '(min-width: 769px) and (max-width: 1024px)'
    )
  );

  private largeBreakpoint = toSignal(
    this.breakpointObserver.observe('(min-width: 1025px)')
  );

  // Custom Breakpoints
  isSmall = computed(() => this.smallBreakpoint()?.matches ?? false);
  isMedium = computed(() => this.mediumBreakpoint()?.matches ?? false);
  isLarge = computed(() => this.largeBreakpoint()?.matches ?? false);
}
