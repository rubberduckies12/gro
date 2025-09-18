import math

def grahams_number(eps, bvps):
    """Graham's Number: fair value based on EPS and BVPS."""
    if eps <= 0 or bvps <= 0:
        return 0.0
    return round(float(math.sqrt(22.5 * eps * bvps)), 2)

def intrinsic_value(eps, growth_rate, bond_yield):
    """
    Graham's Intrinsic Value formula.
    eps: Earnings per share
    growth_rate: expected growth (percent or decimal, e.g. 5 or 0.05)
    bond_yield: AAA bond yield (percent or decimal, e.g. 6 or 0.06)
    """
    if eps <= 0 or bond_yield <= 0:
        return 0.0

    # Normalize inputs to percent if given as decimal
    growth_rate = growth_rate / 100 if growth_rate > 1 else growth_rate
    bond_yield = bond_yield / 100 if bond_yield > 1 else bond_yield

    # Graham's formula expects percent values, so multiply decimals by 100
    intrinsic = eps * (8.5 + 2 * (growth_rate * 100)) * (4.4 / (bond_yield * 100))
    return round(float(intrinsic), 2)